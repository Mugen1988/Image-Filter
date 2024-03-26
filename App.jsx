import React from "react"
import imageUrl from "./images/kunal-goswami-CuUn__aMGD4-unsplash.jpg"

export default function App() {
	const [filter, setFilter] = React.useState({
		"--brightness": 1,
		"--contrast": 1,
		"--saturation": 1,
	})

	const [image, setImage] = React.useState(imageUrl)
	

	function handleChange(event){
		setFilter(prev => ({...prev, [event.target.name]: event.target.value}))
	}

	function handleImageUpload(event) {
        const file = event.target.files[0]
        const reader = new FileReader()

        reader.onload = function(e) {
            setImage(e.target.result)
        }

        reader.readAsDataURL(file)
    }
	
	return (
		<div className="main-container">
			<h1><span>📷</span> Photo Editor <span>📷</span></h1>

			<div className="image-container">
				<img src={image} style={filter} alt="Uploaded" />
			</div>

			<form>
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
				<label className="custom-upload-button">
                    Upload Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </label>
			</form>
		</div>
	)
}
