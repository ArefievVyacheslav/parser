const fs = require('fs')
const compress_images = require("compress-images")

module.exports = async () => {
    const INPUT_path_to_your_images = '../../brand-search-back/images/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}'
    const OUTPUT_path = '../../brand-search-back/images/prepare/';

    compress_images(INPUT_path_to_your_images, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "webp", command: ["-q", "30"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        error => {
            console.log(error)
        }
    );
}
