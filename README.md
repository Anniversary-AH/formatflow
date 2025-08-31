# FormatFlow - In-browser Image Converter

A fast, secure, and privacy-focused image conversion tool that runs entirely in your browser. Convert images between popular formats with ease and speed.

## Features

- **🔄 Multi-format Support**: Convert between JPEG, PNG, WebP, HEIC, and more
- **🔒 Privacy First**: All processing happens in your browser - no files uploaded
- **⚡ Fast & Efficient**: Client-side conversion with optimized algorithms
- **📱 Mobile Friendly**: Fully responsive design works on all devices
- **🎨 Quality Control**: Adjustable quality settings for optimal results
- **📦 Batch Processing**: Convert multiple files at once
- **💾 ZIP Downloads**: Download all converted files as a single ZIP archive

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Merienda, Lexend, Neuton)
- **Image Processing**: HTML Canvas API, heic2any
- **File Handling**: react-dropzone, jszip, file-saver
- **Type Safety**: TypeScript

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anniversary-AH/formatflow.git
   cd formatflow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Upload Images**: Drag and drop or click to select image files
2. **Choose Format**: Select your desired output format
3. **Adjust Quality**: Use the quality slider for optimal file size
4. **Convert**: Click "Convert All" to process your images
5. **Download**: Get your converted files individually or as a ZIP

## Supported Formats

### Input Formats
- JPEG/JPG
- PNG
- WebP
- HEIC/HEIF
- GIF
- BMP
- TIFF

### Output Formats
- JPEG/JPG
- PNG
- WebP

## Development

### Project Structure
```
formatflow/
├── components/          # React components
├── lib/                # Utility functions and types
├── public/             # Static assets
├── src/app/            # Next.js app router pages
├── workers/            # Web Workers for processing
└── tailwind.config.js  # Tailwind configuration
```

### Key Components
- `ImageConverter`: Main conversion interface
- `convert.ts`: Core conversion logic
- `types.ts`: TypeScript definitions
- `worker-manager.ts`: Web Worker management

## Deployment

The easiest way to deploy FormatFlow is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

## Privacy & Security

- **No Server Processing**: All image conversion happens in your browser
- **No File Uploads**: Your images never leave your device
- **No Data Collection**: We don't collect or store any personal information
- **Open Source**: Transparent code for security verification

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

- **Email**: hello@amber-field.com
- **Website**: [https://formatflow.amber-field.com](https://formatflow.amber-field.com)
- **GitHub**: [https://github.com/Anniversary-AH/formatflow](https://github.com/Anniversary-AH/formatflow)
