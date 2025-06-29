import { ApiProperty } from '@nestjs/swagger';

export class FileUploadResponseDto {
  @ApiProperty({ description: 'Upload success status' })
  success: boolean;

  @ApiProperty({ description: 'File URL' })
  url: string;

  @ApiProperty({ description: 'Original filename' })
  originalName: string;

  @ApiProperty({ description: 'Stored filename' })
  filename: string;

  @ApiProperty({ description: 'File size in bytes' })
  size: number;

  @ApiProperty({ description: 'MIME type' })
  mimetype: string;

  @ApiProperty({ description: 'Upload message' })
  message: string;
}

export class MultipleFileUploadResponseDto {
  @ApiProperty({ description: 'Upload success status' })
  success: boolean;

  @ApiProperty({ type: [FileUploadResponseDto], description: 'Uploaded files information' })
  files: Omit<FileUploadResponseDto, 'success' | 'message'>[];

  @ApiProperty({ description: 'Upload message' })
  message: string;
}
