import argparse
import json
from argparse import RawTextHelpFormatter
import requests
from typing import Optional
import warnings
try:
    from langflow.load import upload_file
except ImportError:
    warnings.warn("Langflow provides a function to help you upload files to the flow. Please install langflow to use it.")
    upload_file = None

BASE_API_URL = "http://127.0.0.1:7860"
FLOW_ID = "48c6afbf-4646-4715-8298-d4cb8d8e75d3"
ENDPOINT = "" # You can set a specific endpoint name in the flow settings

# You can tweak the flow by adding a tweaks dictionary
# e.g {"OpenAI-XXXXX": {"model_name": "gpt-4"}}
TWEAKS = {
  "ChatInput-JmiTM": {
    "background_color": "",
    "chat_icon": "",
    "files": "",
    "input_value": "what do i need to do if i like to resign right now",
    "sender": "User",
    "sender_name": "User",
    "session_id": "",
    "should_store_message": True,
    "text_color": ""
  },
  "ParseData-KMCQb": {
    "sep": "\n",
    "template": "{text}"
  },
  "Prompt-cDn7Q": {
    "context": "",
    "question": "",
    "template": "{context}\n\n---\n\nGiven the context above, answer the question as best as possible.\n\nQuestion: {question}\n\nAnswer: "
  },
  "SplitText-BebXr": {
    "chunk_overlap": 250,
    "chunk_size": 1000,
    "separator": "\n"
  },
  "File-OXP2g": {
    "concurrency_multithreading": 4,
    "path": "",
    "silent_errors": False,
    "use_multithreading": False
  },
  "OllamaEmbeddings-PYEu8": {
    "base_url": "http://localhost:11434",
    "model": "nomic-embed-text"
  },
  "FAISS-dk4Ak": {
    "allow_dangerous_deserialization": True,
    "index_name": "langflow_index",
    "number_of_results": 4,
    "persist_directory": "C:\\Users\\Ganesh\\Desktop\\FAISS DATA",
    "search_query": ""
  },
  "OllamaModel-o8CTF": {
    "base_url": "http://localhost:11434",
    "format": "",
    "input_value": "",
    "metadata": {},
    "mirostat": "Disabled",
    "mirostat_eta": None,
    "mirostat_tau": None,
    "model_name": "llama3.2:latest",
    "num_ctx": None,
    "num_gpu": None,
    "num_thread": None,
    "repeat_last_n": None,
    "repeat_penalty": None,
    "stop_tokens": "",
    "stream": False,
    "system": "",
    "system_message": "Answer the user as if you were a GenAI expert, enthusiastic about helping them get started building something fresh.",
    "tags": "",
    "temperature": 0.2,
    "template": "",
    "tfs_z": None,
    "timeout": None,
    "top_k": None,
    "top_p": None,
    "verbose": False
  },
  "OllamaEmbeddings-ul1Ru": {
    "base_url": "http://localhost:11434",
    "model": "nomic-embed-text"
  },
  "FAISS-Fa0UY": {
    "allow_dangerous_deserialization": True,
    "index_name": "langflow_index",
    "number_of_results": 4,
    "persist_directory": "C:\\Users\\Ganesh\\Desktop\\FAISS DATA",
    "search_query": ""
  },
  "TextOutput-9L4jg": {
    "input_value": ""
  },
  "NVIDIAModelComponent-WYi5f": {
    "base_url": "https://integrate.api.nvidia.com/v1",
    "input_value": "",
    "max_tokens": None,
    "model_name": "mistralai/mixtral-8x7b-instruct-v0.1",
    "nvidia_api_key": "",
    "seed": 1,
    "stream": False,
    "system_message": "",
    "temperature": 0.1
  }
}

def run_flow(message: str,
  endpoint: str,
  output_type: str = "chat",
  input_type: str = "chat",
  tweaks: Optional[dict] = None,
  api_key: Optional[str] = None) -> dict:
    """
    Run a flow with a given message and optional tweaks.

    :param message: The message to send to the flow
    :param endpoint: The ID or the endpoint name of the flow
    :param tweaks: Optional tweaks to customize the flow
    :return: The JSON response from the flow
    """
    api_url = f"{BASE_API_URL}/api/v1/run/{endpoint}"

    payload = {
        
        "output_type": output_type,
        "input_type": input_type,
    }
    headers = None
    if tweaks:
        payload["tweaks"] = tweaks
    if api_key:
        headers = {"x-api-key": api_key}
    response = requests.post(api_url, json=payload, headers=headers)
    return response.json()

def main():
    parser = argparse.ArgumentParser(description="""Run a flow with a given message and optional tweaks.
Run it like: python <your file>.py "your message here" --endpoint "your_endpoint" --tweaks '{"key": "value"}'""",
        formatter_class=RawTextHelpFormatter)
    parser.add_argument("message", type=str, help="The message to send to the flow")
    parser.add_argument("--endpoint", type=str, default=ENDPOINT or FLOW_ID, help="The ID or the endpoint name of the flow")
    parser.add_argument("--tweaks", type=str, help="JSON string representing the tweaks to customize the flow", default=json.dumps(TWEAKS))
    parser.add_argument("--api_key", type=str, help="API key for authentication", default=None)
    parser.add_argument("--output_type", type=str, default="chat", help="The output type")
    parser.add_argument("--input_type", type=str, default="chat", help="The input type")
    parser.add_argument("--upload_file", type=str, help="Path to the file to upload", default=None)
    parser.add_argument("--components", type=str, help="Components to upload the file to", default=None)

    args = parser.parse_args()
    try:
      tweaks = json.loads(args.tweaks)
    except json.JSONDecodeError:
      raise ValueError("Invalid tweaks JSON string")

    if args.upload_file:
        if not upload_file:
            raise ImportError("Langflow is not installed. Please install it to use the upload_file function.")
        elif not args.components:
            raise ValueError("You need to provide the components to upload the file to.")
        tweaks = upload_file(file_path=args.upload_file, host=BASE_API_URL, flow_id=args.endpoint, components=[args.components], tweaks=tweaks)

    response = run_flow(
        message=args.message,
        endpoint=args.endpoint,
        output_type=args.output_type,
        input_type=args.input_type,
        tweaks=tweaks,
        api_key=args.api_key
    )

    print(json.dumps(response, indent=2))
    with open('response.json', 'w') as f:
        json.dump(response, f, indent=2)


if __name__ == "__main__":
    main()
