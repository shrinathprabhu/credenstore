export function extractFileContent(file) {
    const reader = new FileReader();
    reader.addEventListener('load', event => {
        console.log(event.target.result);
    });
    reader.readAsBinaryString(file);
}