# User post
To create a user post a call to the api must be done first using the `api/S3/upload` url first to upload the image, the format must in the 
``` 
{
    key: "file"
    file: file content
} 
``` 
Then you should receive a url response which can be used in a spring api call for post