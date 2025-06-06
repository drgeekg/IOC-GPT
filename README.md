
# IOC-GPT

This repository contains the code for the implementation of IOC GPT. Follow the steps below to set up and run the project.

## Setup Instructions

### Step 1: Install Python
1. Download Python 3.11.9 from the [official website](https://www.python.org/downloads/).
2. Install Python and ensure it is added to your system's PATH.

### Step 2: Install Ollama
1. Download and install Ollama from [here](https://ollama.com/).
2. Verify installation by running:
   ```bash
   ollama --version
   ```

### Step 3: Set Up Ollama Files
1. Download the required files from [this link](https://drive.google.com/file/d/1rcsJ4Hu-YUfCdqQ3C7CMFTEI3qnDSXGa/view?usp=sharing).
2. Extract the .rar file.
3. Copy the exracted file to the `.ollama` directory located in your user folder. (Eg.  C:\Users\BRTH\.ollama)
4. Ensure Ollama is running by executing:
   ```bash
   ollama start
   ```

### Step 4: Install `uv`
1. Install `uv` by running:
   ```bash
   pip install uv --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org
   ```

### Step 5: Create a Virtual Environment
1. Use `uv` to create a virtual environment:
   ```bash
   uv venv
   ```
2. Activate the virtual environment:
   - On Windows:
     ```bash
     .venv\Scripts\activate
     ```

### Step 6: Install LangFlow
1. Install LangFlow in the virtual environment:
   ```bash
   uv pip install langflow --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org
   ```

### Step 7: Resolve Other Dependency Issues
1. If any other dependency throws an error during installation, follow these steps:
   - Use `uv` to install the library directly:
     ```bash
     uv pip install {NAME OF LIBRARY} --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org
     ```
   - Alternatively, copy the name of the library throwing the error and search for the appropriate file on [PyPI](https://pypi.org).
   - Download the `.whl` file and install it using the following command:
     ```bash
     uv pip install /path/to/{LIBRARY_FILE}.whl --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org
     ```

### Step 8: Resolve `google-cloud-aiplatform` Issues
1. If you face issues with `google-cloud-aiplatform` version 1.75.0, download the `.whl` file from [PyPI](https://pypi.org/project/google-cloud-aiplatform/1.75.0/#files).
2. Install the downloaded file:
   ```bash
   uv pip install /path/to/google_cloud_aiplatform-1.75.0-py2.py3-none-any.whl --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org
   ```

### Step 9: Start LangFlow
1. Start LangFlow using `uv`:
   ```bash
   uv run langflow run
   ```
2. Wait for LangFlow to boot completely.
3. Once running, LangFlow will be hosted locally. You can access it at: [http://127.0.0.1:7860](http://127.0.0.1:7860).

### Step 10: Import and Configure the Flow in LangFlow
1. Open the LangFlow UI in your browser using the hosted link: [http://127.0.0.1:7860](http://127.0.0.1:7860).
2. Click on **"Import Flow"** and upload the provided `.flow` file (downloadable [here](#)).
3. After importing, review the flow configuration:
   - Adjust **parameters** such as API keys, endpoint URLs, or model details as required.
   - Verify all connections between nodes are correct.
4. Save the flow configuration after making changes.

**Screenshots:**
- Below are screenshots showing the import process and key parameters to modify:

***TO BE UPDATED***

---

## Frontend Setup (HTML, CSS, JS)

***TO BE UPDATED***

---

For additional issues or clarifications, feel free to open a [GitHub Issue](https://github.com/your-repo/issues). 
