import React, { useRef } from "react"
import imageUrl from "./images/kunal-goswami-CuUn__aMGD4-unsplash.jpg"

export default function App() {
	const canvasRef = useRef(null)
    const fileInputRef = useRef(null)

	const [uploadedImage, setUploadedImage] = React.useState(null);
	const [filter, setFilter] = React.useState({
		"--brightness": 1,
		"--contrast": 1,
		"--saturation": 1,
	})
	

	function handleChange(event){
		setFilter(prev => ({...prev, [event.target.name]: event.target.value}))
	}

	function handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            setUploadedImage(e.target.result);
        };

        reader.readAsDataURL(file);
    }

	function handleDownload() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.filter = `brightness(${filter["--brightness"]}) contrast(${filter["--contrast"]}) saturate(${filter["--saturation"]})`;
            ctx.drawImage(img, 0, 0);
            
            // Convert canvas content to image data URL
            const imageUrl = canvas.toDataURL("image/png");

            // Create a temporary link element
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = "modified_image.png";
            link.click();
        };

        img.src = uploadedImage || imageUrl;
    }
	
	return (
		<div className="main-container">
			<div className="image-container">
				<canvas ref={canvasRef} style={{ display: "none" }} />
                {uploadedImage && <img src={uploadedImage} style={filter} alt="Uploaded" />}
                {!uploadedImage && <img src={imageUrl} style={filter} alt="Original" />}
			</div>

			<form>
				<label className="custom-upload-button">
						Upload Image
						<input
						type="file"
						ref={fileInputRef}
						accept="image/*"
						style={{ display: "none" }}
						onChange={handleFileChange}
						onClick={() => fileInputRef.current.click()}
					/>
                </label>
				<label>
					<input
						type="range"
						name="--brightness"
						min={0}
						max={2}
						step={0.1}
						value={filter["--brightness"]}
						onChange={handleChange}
					/>
					<span>Brightness</span>
				</label>

				<label>
					<input
						type="range"
						name="--contrast"
						min={0}
						max={2}
						step={0.1}
						value={filter["--contrast"]}
						onChange={handleChange}
					/>
					<span>Contrast</span>
				</label>

				<label>
					<input
						type="range"
						name="--saturation"
						min={0}
						max={2}
						step={0.1}
						value={filter["--saturation"]}
						onChange={handleChange}
					/>
					<span>Saturation</span>
				</label>
			</form>
			<button onClick={handleDownload} className="custom-download-button">Download Image</button>
		</div>
	)
}
