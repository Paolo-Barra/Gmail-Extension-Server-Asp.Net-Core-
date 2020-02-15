export class XmlHttpRequestHelper {

    // Documenation for xmlHttpRequestHelper 
    // https://javascript.info/xmlhttprequest 
    static ajax(type: string, url: string, customHeaders: any, data: any, success: any) {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let result = JSON.parse(xhr.responseText);
                    success(result);
                } else if (xhr.status !== 0) {
                    alert(`The reFind backend expeienced san error.`);
                }
            }
        };
        xhr.ontimeout = () => {
            alert(`Unable to connect to the reFind backend host or the Internet due to a timeout! ${xhr.status} ${xhr.response}`);
        }

        xhr.onerror = () => {
            alert(`Unable to connect to the reFind backend host or the Internet! ${xhr.status} ${xhr.response}`);
        }

        url += (url.indexOf('?') >= 0 ? '&' : '?') + 'd=' + new Date().getTime();
        xhr.open(type, url, true);

        for (let property in customHeaders) {
            if (customHeaders.hasOwnProperty(property)) {
                xhr.setRequestHeader(property, customHeaders[property]);
            }
        }

        xhr.setRequestHeader('Content-type', 'application/json');
        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
    }
}
