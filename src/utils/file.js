export function extractFileContent(file) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.addEventListener('load', event => {
                return resolve(
                    {
                        name: file.name,
                        type: file.type,
                        content: event.target.result,
                    }
                );
            });
            reader.readAsBinaryString(file);
        } catch (e) {
            return reject(e);
        }
    });
}