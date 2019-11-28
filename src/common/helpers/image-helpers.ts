export class ImageHelpers {
    public static loadImage(imageSrc: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image: HTMLImageElement = new Image();

            image.onload = () => {
                resolve(image);
            };

            image.src = imageSrc;
        });
    }

    public static getImageExtensionFromDataUrl(dataUrl: string): string {
        const fileType: string = dataUrl.substring("data:image/".length, dataUrl.indexOf(";base64"));
        return fileType;
    }

    public static async ensureDataUrl(imageSrc: string): Promise<string> {
        if (ImageHelpers.isDataUrl(imageSrc)) {
            return imageSrc;
        }

        const response: Response = await fetch(imageSrc);
        const blob: Blob = await response.blob();
        const b64: string = await ImageHelpers.blobToB64(blob);

        return b64;
    }

    public static isDataUrl(src: string): boolean {
        const dataUrlRegex: RegExp = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
        return !!src.match(dataUrlRegex);
    }

    public static blobToB64(blob: Blob): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader: FileReader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
}