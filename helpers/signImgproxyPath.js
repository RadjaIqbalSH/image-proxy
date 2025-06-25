// export function signImgproxyPath(path, callback) {
//   const iframe = document.getElementById("imgproxy-signer");
//   if (!iframe?.contentWindow) return;

//   const messageId = Math.random().toString(36).substring(2, 10);

//   function handler(event) {
//     if (event.origin !== "http://localhost:3000") return;
//     if (event.data?.type !== "signed-imgproxy-url") return;
//     if (event.data?.id !== messageId) return;

//     window.removeEventListener("message", handler);
//     callback(event.data.url);
//   }

//   window.addEventListener("message", handler);
//   iframe.contentWindow.postMessage({ type: "sign", path, id: messageId }, "http://localhost:3000");
// }

// export function signImgproxyPath(path) {
//   return new Promise((resolve) => {
//     const iframe = document.getElementById("imgproxy-signer");
//     if (!iframe?.contentWindow) return resolve(null);

//     const messageId = Math.random().toString(36).substring(2, 10);

//     function handler(event) {
//       if (event.origin !== "http://localhost:3000") return;
//       if (event.data?.type !== "signed-imgproxy-url") return;
//       if (event.data?.id !== messageId) return;

//       window.removeEventListener("message", handler);
//       resolve(event.data.url);
//     }

//     window.addEventListener("message", handler);
//     iframe.contentWindow.postMessage(
//       { type: "sign", path, id: messageId },
//       "http://localhost:3000"
//     );
//   });
// }

// export function signImgproxyPath(path) {
//   return new Promise((resolve, reject) => {
//     const iframe = document.getElementById("imgproxy-signer");
//     if (!iframe?.contentWindow) return reject("Iframe signer not found");

//     const messageId = Math.random().toString(36).substring(2, 10);

//     const handler = (event) => {
//       if (event.origin !== "http://localhost:3000") return;
//       if (event.data?.type !== "signed-imgproxy-url") return;
//       if (event.data?.id !== messageId) return;

//       window.removeEventListener("message", handler);
//       clearTimeout(timeout);
//       resolve(event.data.url);
//     };

//     const timeout = setTimeout(() => {
//       window.removeEventListener("message", handler);
//       reject("Signing timeout");
//     }, 5000); // prevent hanging

//     window.addEventListener("message", handler);

//     iframe.contentWindow.postMessage(
//       { type: "sign", path, id: messageId },
//       "http://localhost:3000"
//     );
//   });
// }


const queue = [];
let isProcessing = false;

export function signImgproxyPath(path) {
  return new Promise((resolve, reject) => {
    const iframe = document.getElementById("imgproxy-signer");
    if (!iframe?.contentWindow) return reject("Iframe signer not found");

    const messageId = Math.random().toString(36).substring(2, 10);

    const task = () => {
      const handler = (event) => {
        if (event.origin !== "http://localhost:3000") return;
        if (event.data?.type !== "signed-imgproxy-url") return;
        if (event.data?.id !== messageId) return;

        window.removeEventListener("message", handler);
        clearTimeout(timeout);
        isProcessing = false;
        next(); // proses berikutnya
        resolve(event.data.url);
      };

      const timeout = setTimeout(() => {
        window.removeEventListener("message", handler);
        isProcessing = false;
        next();
        reject("Signing timeout");
      }, 5000);

      window.addEventListener("message", handler);
      iframe.contentWindow.postMessage({ type: "sign", path, id: messageId }, "http://localhost:3000");
    };

    queue.push(task);
    if (!isProcessing) next();
  });
}

function next() {
  if (queue.length === 0) return;
  isProcessing = true;
  const nextTask = queue.shift();
  nextTask();
}
