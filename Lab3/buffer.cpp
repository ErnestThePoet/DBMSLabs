/**
 * @author See Contributors.txt for code contributors and overview of BadgerDB.
 *
 * @section LICENSE
 * Copyright (c) 2012 Database Group, Computer Sciences Department, University of Wisconsin-Madison.
 */

#include <memory>
#include <iostream>
#include "buffer.h"
#include "exceptions/buffer_exceeded_exception.h"
#include "exceptions/page_not_pinned_exception.h"
#include "exceptions/page_pinned_exception.h"
#include "exceptions/bad_buffer_exception.h"
#include "exceptions/hash_not_found_exception.h"

namespace badgerdb
{

	BufMgr::BufMgr(std::uint32_t bufs)
		: numBufs(bufs)
	{
		bufDescTable = new BufDesc[bufs];

		for (FrameId i = 0; i < bufs; i++)
		{
			bufDescTable[i].frameNo = i;
			bufDescTable[i].valid = false;
		}

		bufPool = new Page[bufs];

		int htsize = ((((int)(bufs * 1.2)) * 2) / 2) + 1;
		hashTable = new BufHashTbl(htsize); // allocate the buffer hash table

		clockHand = bufs - 1;
	}

	BufMgr::~BufMgr()
	{
		for (FrameId i = 0; i < numBufs; i++)
		{
			if (bufDescTable[i].dirty)
			{
				bufDescTable[i].file->writePage(bufPool[i]);
			}
		}

		delete[] bufDescTable;
		delete[] bufPool;
		delete hashTable;
	}

	void BufMgr::advanceClock()
	{
		clockHand = (clockHand + 1) % numBufs;
	}

	void BufMgr::allocBuf(FrameId &frame)
	{
		for (uint32_t count = 0; count < numBufs; advanceClock())
		{
			if (!bufDescTable[clockHand].valid)
			{
				frame = clockHand;
				return;
			}

			if (bufDescTable[clockHand].refbit)
			{
				bufDescTable[clockHand].refbit = false;
				continue;
			}

			if (bufDescTable[clockHand].pinCnt > 0)
			{
				count++;
				continue;
			}

			if (bufDescTable[clockHand].dirty)
			{
				bufDescTable[clockHand].file->writePage(bufPool[clockHand]);
				bufDescTable[clockHand].dirty = false;
			}

			frame = clockHand;

			try
			{
				hashTable->remove(
					bufDescTable[clockHand].file,
					bufDescTable[clockHand].pageNo);
			}
			catch (const HashNotFoundException &e)
			{
			}

			return;
		}

		throw BufferExceededException();
	}

	void BufMgr::readPage(File *file, const PageId pageNo, Page *&page)
	{
		try
		{
			FrameId frameId = 0;
			hashTable->lookup(file, pageNo, frameId);

			bufDescTable[frameId].refbit = true;
			bufDescTable[frameId].pinCnt++;

			page = &bufPool[frameId];
		}
		catch (const HashNotFoundException &e)
		{
			FrameId frameId = 0;
			allocBuf(frameId);

			bufPool[frameId] = file->readPage(pageNo);

			hashTable->insert(file, pageNo, bufDescTable[frameId].frameNo);

			bufDescTable[frameId].Set(file, pageNo);

			page = &bufPool[frameId];
		}
	}

	void BufMgr::unPinPage(File *file, const PageId pageNo, const bool dirty)
	{
		try
		{
			FrameId frameId = 0;
			hashTable->lookup(file, pageNo, frameId);

			if (bufDescTable[frameId].pinCnt == 0)
			{
				throw PageNotPinnedException(file->filename(), pageNo, frameId);
			}

			bufDescTable[frameId].pinCnt--;

			if (dirty)
			{
				bufDescTable[frameId].dirty = true;
			}
		}
		catch (const HashNotFoundException &e)
		{
		}
	}

	void BufMgr::flushFile(File *file)
	{
		for (FrameId i = 0; i < numBufs; i++)
		{
			if (bufDescTable[i].file != file)
			{
				continue;
			}

			if (bufDescTable[i].pinCnt != 0)
			{
				throw PagePinnedException(
					file->filename(), bufDescTable[i].pageNo, bufDescTable[i].frameNo);
			}

			if (!bufDescTable[i].valid)
			{
				throw BadBufferException(
					bufDescTable[i].frameNo,
					bufDescTable[i].dirty,
					bufDescTable[i].valid,
					bufDescTable[i].refbit);
			}

			if (bufDescTable[i].dirty)
			{
				file->writePage(bufPool[i]);

				bufDescTable[i].dirty = false;
			}

			hashTable->remove(file, bufDescTable[i].pageNo);

			bufDescTable[i].Clear();
		}
	}

	void BufMgr::allocPage(File *file, PageId &pageNo, Page *&page)
	{
		auto newPage = file->allocatePage();

		FrameId frameId = 0;
		allocBuf(frameId);

		bufPool[frameId] = newPage;

		hashTable->insert(file, newPage.page_number(), frameId);

		bufDescTable[frameId].Set(file, newPage.page_number());

		pageNo = newPage.page_number();
		page = &bufPool[frameId];
	}

	void BufMgr::disposePage(File *file, const PageId pageNo)
	{
		try
		{
			FrameId frameId = 0;
			hashTable->lookup(file, pageNo, frameId);
			hashTable->remove(file, pageNo);
			bufDescTable[frameId].Clear();
		}
		catch (const HashNotFoundException &e)
		{
		}
	}

	void BufMgr::printSelf(void)
	{
		BufDesc *tmpbuf;
		int validFrames = 0;

		for (std::uint32_t i = 0; i < numBufs; i++)
		{
			tmpbuf = &(bufDescTable[i]);
			std::cout << "FrameNo:" << i << " ";
			tmpbuf->Print();

			if (tmpbuf->valid == true)
				validFrames++;
		}

		std::cout << "Total Number of Valid Frames:" << validFrames << "\n";
	}

}
