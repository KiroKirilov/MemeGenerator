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
}