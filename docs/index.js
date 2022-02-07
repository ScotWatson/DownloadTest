/*
(c) 2022 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

window.addEventListener("load", function () {
  let btnLink = document.getElementById("btnLink");
  let btnAPI = document.getElementById("btnAPI");
  btnLink.addEventListener("click", function () {
    downloadFileLink("Hello World!", "hello.txt");
  });
  btnAPI.addEventListener("click", function () {
    downloadFileAPI("Hello World!", "hello.txt");
  });
});
function downloadFileLink(contents, filename) {
  try {
    let blobContents = new Blob( [ contents ] );
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blobContents);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  } catch (e) {
    alert(e.message);
  }
}
function downloadFileAPI(contents, filename) {
  let hdlParentDirectory = window.showDirectoryPicker();
  console.log(hdlParentDirectory);
  console.log(Object.getOwnPropertyDescriptors(hdlParentDirectory));
  let promiseFile = hdlParentDirectory.getFileHandle(filename, { create: true } );
  let promiseFileStream = promiseFile.then(function (hdlFile) {
    return hdlFile.createWritable();
  });
  promiseFileStream.then(function (stream) {
    stream.write(contents);
  });
}
