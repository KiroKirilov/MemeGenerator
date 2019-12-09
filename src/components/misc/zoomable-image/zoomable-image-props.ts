export type ZoomableImageProps = {
    imageSrc: string;
    alt: string;
    imageClasses?: string;
    containerClasses?: string;
    onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    containerStyles?: React.CSSProperties;
    imageStyles?: React.CSSProperties;
};