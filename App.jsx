import React from "react"
import imageUrl from "./images/kunal-goswami-CuUn__aMGD4-unsplash.jpg"

export default function App() {
	const [filter, setFilter] = React.useState({
		"--brightness": 1,
		"--contrast": 1,
		"--saturation": 1,
	})
	

	function handleChange(event){
		setFilter(prev => ({...prev, [event.target.name]: event.target.value}))
	}
	
	return (
		<div className="main-container">
			<h1><span>📷</span> Photo Editor <span>📷</span></h1>

			<div className="image-container">
				<img src={imageUrl} style={filter}/>
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
			</form>
		</div>
	)
}
