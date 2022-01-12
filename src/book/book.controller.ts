import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Get()
  async index() {
    return this.bookService.books({});
  }

  @Post()
  async create(@Body() body: CreateBookDto) {
    const { title, content, authorId } = body

    return this.bookService.createBook({ title, content, author: { connect: { id: parseInt(authorId) } } });
  }

  @Put('/:id')
  async update(@Body() body: CreateBookDto, @Param('id') id: string) {
    const { title, content, authorId, published } = body

    const data: any = { title, content }

    if (authorId) {
      data.author = { connect: { id: parseInt(authorId) || undefined } }
    }

    if (published !== undefined) {
      data.published = published === '1' ? true : false
    }

    return this.bookService.updateBook({
      where: { id: parseInt(id) },
      data
    });
  }

  @Get('/:id')
  async view(@Param('id') id: string) {
    return this.bookService.book({
      id: parseInt(id)
    });
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    try {
      const book = await this.bookService.deleteBook({
        id: parseInt(id)
      });

      if (book) {
        return { status: true }
      } else {
        return { status: false }
      }
    } catch (error) {
      return error
    }
  }
}
