export class CreateBookDto {
  title: string;
  content: string;
  published?: boolean | string | number;
  authorId: string;
}
