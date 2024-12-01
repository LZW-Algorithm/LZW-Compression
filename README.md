# LZW Compression Visual Simulation

This project is a web-based visualization of the LZW (Lempel-Ziv-Welch) compression algorithm, designed to provide a clear understanding of how data compression occurs step-by-step. It includes interactive features that allow users to input their text, compress and decompress it, and view detailed feedback on the compression process.

![image](https://github.com/user-attachments/assets/a238392e-f158-4821-a475-3f9f9ef0627a)

## Features

- **Interactive Text Input**: Users can enter the text they wish to compress directly into the browser.
- **Compression and Decompression**: Implements LZW compression and decompression functionalities.
- **Visual Feedback**: Displays step-by-step updates on how the text is being compressed, including dictionary updates.
- **Performance Metrics**: Provides insights into the compression rate and the time taken to compress the provided data.

## How It Works

The web interface allows users to enter text which is then processed by the LZW algorithm. The compression logic includes:
- Initializing a dictionary with predefined codes for individual byte values.
- Iteratively processing each byte of input data, combining strings and adding new entries to the dictionary.
- Dynamically displaying changes to the dictionary and the output compression codes in the user interface.

Decompression reverses the encoded data back to its original form using the encoded integers and the dictionary built during the compression phase.

## Technologies Used

- **HTML/CSS**: For structuring and styling the web interface.
- **JavaScript**: Powers the core functionalities of compression and decompression.
