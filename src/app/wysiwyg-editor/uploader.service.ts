// export class MyUploadAdapter {
//     public loader: any;
//     public url: string;
//     public xhr: XMLHttpRequest;
//     public token: string;
  
//     constructor(loader) {
//       this.loader = loader;
  
//       // change "environment.BASE_URL" key and API path
//       this.url = 'http://localhost:3000/video/upload';
  
//       // change "token" value with your token
//       //this.token = localStorage.getItem("token");
//     }
  
//     upload() {
//       return new Promise(async (resolve, reject) => {
//         this.loader.file.then((file) => {
//           var blob = new Blob([file], {
//             type: 'application/*'
//           });
//           const file1 = window.URL.createObjectURL(blob);
//           console.log(file1);
//           return file1;
//           //   const dataUrl =  this.getDataUrl(file);
//           //   console.log("-----" + dataUrl);
            
//           // this._initRequest();
//           // this._initListeners(resolve, reject, file);
//           // this._sendRequest(file);
//         });
//       });
//     }
  
//     abort() {
//       if (this.xhr) {
//         this.xhr.abort();
//       }
//     }
  
//     _initRequest() {
//       const xhr = (this.xhr = new XMLHttpRequest());
//       xhr.open("POST", this.url, true);
  
//       // change "Authorization" header with your header
//       //xhr.setRequestHeader("Authorization", this.token);
  
//       xhr.responseType = "json";
//     }
  
//     _initListeners(resolve, reject, file) {
//       const xhr = this.xhr;
//       const loader = this.loader;
//       const genericErrorText = "Couldn't upload file:" + ` ${file.name}.`;
  
//       xhr.addEventListener("error", () => reject(genericErrorText));
//       xhr.addEventListener("abort", () => reject());
  
//       xhr.addEventListener("load", () => {
//         const response = xhr.response;
  
//         if (!response || response.error) {
//           return reject(
//             response && response.error ? response.error.message : genericErrorText
//           );
//         }
  
//         // change "response.data.fullPaths[0]" with image URL
//         resolve({
//           default: response.data.fullPaths[0],
//         });
//       });
  
//       if (xhr.upload) {
//         xhr.upload.addEventListener("progress", (evt) => {
//           if (evt.lengthComputable) {
//             loader.uploadTotal = evt.total;
//             loader.uploaded = evt.loaded;
//           }
//         });
//       }
//     }
  
//     _sendRequest(file) {
//       const data = new FormData();
  
//       // change "attachments" key
//       data.append("attachments", file);
  
//       this.xhr.send(data);
//     }

//     getDataUrl(img) {
//         // Create canvas
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
//         // Set width and height
//         canvas.width = img.width;
//         canvas.height = img.height;
//         // Draw the image
//         ctx.drawImage(img, 0, 0);
//         return canvas.toDataURL('image/jpeg');
//     }
//      // Select the image
     
// }

export class MyUploadAdapter {
  loader;
  constructor( loader ) {
     this.loader = loader;
  }

  upload() {
     return this.loader.file
           .then( file => new Promise( ( resolve, reject ) => {
                 var myReader= new FileReader();
                 myReader.onloadend = (e) => {
                    resolve({ default: myReader.result });
                 }

                 myReader.readAsDataURL(file);
           } ) );
  };
}