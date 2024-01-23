## RPA tool to use for development? Challenges? You may have a quick test before our meeting.
 - RPA tool to use for development
 - PAD for workflow control
 - JS for extraction
 - JS for data validation and analyze
 - csv

## Modules

 - PAD sub function to extract JS code from file/online
    - Input: JS file/ URL
    - Output: JS code
 - JS for extraction: Output: wall list JSON with EE info
    - Input: JS code
    - Output: JSON string in web element id= js_res
 - PAD sub function to convert json to excel
    - Input: JSON string extracted from website
    - Output: excel file with EE file, ONE EE IN ONE CSV WIHT ALL WALL CARD AND EE INFO
 

# Input:
 - CONFIG

# Output: 
 - EE info AND Wall card in separate file for afterward processing

# Config:
 - CONFIG
 - Output saving path
