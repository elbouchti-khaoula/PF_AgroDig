
import React, { useState, useEffect, useMemo, useCallback,useRef } from "react";
import "../Home/Home.css";
import { BiImageAdd, BiPhotoAlbum, BiX } from "react-icons/bi";
import { useApp } from "../contexts/AppContext";
import '../App.css';
import Layout from '../others/Layout';
import { useBlogs } from "../contexts/BlogContext";
import CustomizedHook from "./TagInput";
import { useTags } from "../contexts/TagContext";



function BlogForm() {
	const [imageString, setImageStr] = useState("");
	const [caption, setCaption] = useState("");
	const [preview, setPreview] = useState({ state: false, url: "" });
	const [loading, setLoading] = React.useState(false);
	const { isDark } = useApp();
	const [fontSize, setFontSize] = useState("16px");
	const [fontFamily, setFontFamily] = useState("Arial");
	const [textAlign, setTextAlign] = useState("left");
	const [theValue, setTheValue ] = useState();
	const [blogData, setBlogData] = useState({
		body : '',
		title : '',
		attachements : undefined,
		userId : 0,
		tagIds : undefined
	});
	const {newBlog, getBlogs, blogs} = useBlogs();
	const {blogTags, getBlogTags} = useTags();

	const contentref = useRef();

	const {body, title, attachements,userId,tagIds} = blogData;


	const handleFontFamily = (family) => {
	  setFontFamily(family);
	}
	
	const handleFontSize = (size) => {
	  setFontSize(size);
	}
	
	const handleText = (text) => {
	  setText(text);
	}
	
	const previewFile = (e) => {
		const file = e.target.files[0];
		setBlogData((prev) => ({
			...prev,
			attachements : file
		}))
		console.log(file);
		setBlogData((prevState) =>({
			...prevState,
			attachements : file
		}))
		setPreview({ state: true, url: URL.createObjectURL(e.target.files[0]) });
		const reader = new FileReader();
		reader.addEventListener("loadend", () => {
			setImageStr(reader.result);
		});
		reader.readAsDataURL(file);
		console.log(imageString);
	};

	const submitBlog = async (e) => {
		// e.preventDefault();
		setLoading(true);
		// console.log("logging bfore submit      :"+ theValue);
		// // setBlogData({...blogData, 'tagIds' : theValue});
		// console.log("logging bfore submit  agaaain     :" + blogData.tagIds);

		const isdone = await newBlog(blogData);
		if (isdone) {
			console.log("done");
			setLoading(false);
			window.location.href = "/";
			//setShowBlogForm(false);
		}
		// const blog = await getBlogs();
		// console.log(blog);
		
	};

	const handleTitleChange = (e) => {
		setBlogData((prevState) => ({
			...prevState,
			title : e.target.value
		}));
		console.log(blogData.title)
	}
	const handleBodyChange = () => {
		setBlogData((prevState) => ({
			...prevState,
			body : contentref.current.innerHTML
		}));
		console.log(blogData.body);
	};
	
	useEffect(() => {
		getBlogTags();
		setBlogData((prev)=>({
			...prev,
			tagIds : theValue
		}))

		
	  },[theValue])


	return (
		
		<Layout active={'home'}>
		<div className="w-full  left-0 z-[20] absolute 
		flex flex-col items-center justify-center">
            <h2 className=" mobile:text-xl text-green-700">Add a Blog </h2>
            <h6 className=" mobile:text-xs text-gray-700">cet espace est créé pour partager les idées avec les autres ou pour ajouter des blog il suffit donc de remplir tout les champs</h6>
            
            {/*distance*/}<div className={`flex z-30 flex-col h-2 relative mobile:w-2/3 w-11/12 max-w-[600px]`}></div>

			{/* <div
				className={`flex z-30 flex-col relative mobile:w-2/3 w-11/12 max-w-[900px] rounded-xl p-4 bg-white ${
					isDark && "text-white bg-[#0a0520]"
				}`}
			>
				<h2 className="text-center mobile:text-l">Language:</h2>
				
				<select 
					onChange={(e) => setSelection(e.target.value)} 
					className="border-2 outline-none border-gray-500 p-2 w-full bg-transparent"
					>
					<option value="" disabled selected>choose a language</option>
					<option value="option1">Arabic</option>
					<option value="option2">French</option>
					<option value="option3">English</option>
					</select>
                </div> */}
{/*distance*/}<div className={`flex z-30 flex-col h-2 relative mobile:w-2/3 w-11/12 max-w-[600px]`}></div>

                <div
				className={`flex flex-col relative mobile:w-2/3 w-11/12 max-w-[900px] rounded-xl p-4 bg-white min-height: calc(200px + (1.5vw * ${caption.length})) ${
					isDark && "text-white bg-[#0a0520]"
				}`}
			><h2 className="text-center mobile:text-l">Title:</h2>
				<textarea
					onChange={handleTitleChange}
					value={title}
					//onChange={(e) => setCaption(e.target.value)}
					className="border-2 h-[10vh] outline-none border-gray-500/70 p-2 w-full bg-transparent"
					placeholder="Title"
					maxLength={700}
				></textarea>
                </div>
{/*distance*/}<div className={`flex z-30 flex-col h-2 relative mobile:w-2/3 w-11/12 max-w-[600px]`}></div>

                <div
				className={`flex z-30 flex-col relative mobile:w-2/3 w-11/12 max-w-[900px] rounded-xl p-4 bg-white ${
					isDark && "text-white bg-[#0a0520]"
				}`}
			><h2 className="text-center mobile:text-l">What are the details of your Blog </h2> 
			
			<div className="toolbar">
				<div><label htmlFor="post"className="flex cursor-pointer text-green-700 items-center">
				<BiImageAdd className="text-2xl" />
					</label><input
						onChange={previewFile}
						className="hidden"
						type="file"
						id="post"
						accept="image/*"
						submitBlog={submitBlog}
						setLoading={setLoading}
						loading={loading}/></div>
											
					<button className="green-button" onClick={() => setTextAlign("left")}>Left</button>
					<button  className="green-button" onClick={() => setTextAlign("center")}>Center</button>
					<button className="green-button" onClick={() => setTextAlign("right")}>Right</button>
					<button className="green-button" onClick={() => setFontFamily("Arial")}>Arial</button>
					<button className="green-button" onClick={() => setFontFamily("Times New Roman")}>Times New Roman</button>
					<button className="green-button" onClick={() => setFontSize("12px")}>12px</button>
					<button className="green-button" onClick={() => setFontSize("16px")}>16px</button>
					<button className="green-button" onClick={() => setFontSize("20px")}>20px</button>
											
					</div>


					<div
			contentEditable={true}
			//onChange={(e) => setCaption(e.target.value)}
			onChange={handleBodyChange}
			ref ={contentref} 
			className={`border-2 outline-none border-gray-500/70 p-2 w-full bg-transparent min-height: 40vh`}
			placeholder="Describe your problem, what you did, what you hope to happen or something you’re simply curious about"
			//onInput={(e) => setText(e.target.innerText)}
			onInput={handleBodyChange}
			value={body}
			style={{ fontSize: fontSize, fontFamily: fontFamily, textAlign: textAlign }}
			></div>






			{/* very  important section do not delete  */}



{/* 
				  <img src= {`http://localhost:8282/api/blog/download/3.jpeg`} style={{width : "200px"}}/>
				  <img src= {`http://localhost:8083/api/post/download/5.jpeg`} style={{width : "200px"}}/> */}


				 {preview.state && (
					<div className="w-[150px] mx-auto mt-3 h-[150px] overflow-hidden">
						<img
							src={imageString}
							className="object-cover min-h-full min-w-full"
							alt=""
						/>
					</div>
				)}
                </div>
{/*<div className="toolbar">
					<button onClick={() => setFontFamily("Arial")}><FontAwesomeIcon icon={faArial} /></button>
				<button onClick={() => setFontFamily("Times New Roman")}><FontAwesomeIcon icon={faTimes} /></button>
				<button onClick={() => setFontSize("12px")}>12px</button>
				<button onClick={() => setFontSize("16px")}>16px</button>
				<button onClick={() => setFontSize("20px")}>20px</button>
				</div>


				<div 
				contentEditable={true}
				onChange={(e) => setCaption(e.target.value)}
				className="border-2 h-[20vh] outline-none border-gray-500/70
			  p-2 w-full bg-transparent" placeholder="Describe your problem, what you did, what you hope to happen or something you’re simply curious about"
				
				onInput={(e) => setText(e.target.innerText)}
				style={{ fontSize: fontSize, fontFamily: fontFamily }}>
				</div>*/}

        {/*distance*/}<div className={`flex z-30 flex-col h-2 relative mobile:w-2/3 w-11/12 max-w-[600px]`}></div>

                <div
				className={`flex z-30 flex-col relative mobile:w-2/3 w-11/12 max-w-[900px] rounded-xl p-4 bg-white ${
					isDark && "text-white bg-[#0a0520]"
				}`}
			><h2 className="text-center mobile:text-l">Tags:</h2>
				<h6 className=" mobile:text-s text-gray-700">Add up to 5 Tags to describe what your Question is about</h6>
            
				{/* <div 
					contentEditable={true}
					className="editable-content border-2 p-2 w-full bg-transparent"
					onInput={(e) => setText(e.target.innerText)}
					style={{ fontSize: "16px", fontFamily: "Arial" }}
					>
					#
					</div> */}
					<CustomizedHook tags={blogTags} theValue={theValue} setTheValue={setTheValue}/>

                </div>
				<br/>
				
               
				<button
				style={{padding:"10px", marginLeft : "800px"}}
				className="py-2 px-4 rounded-lg bg-green-500 text-white hover:bg-green-600"
				onClick={submitBlog}
				disabled={loading}>
				{loading ? "Submitting..." : "Submit Blog"}
			</button>
					

					
		</div>
    </Layout>
	);
}

export default BlogForm;
