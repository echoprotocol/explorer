class FileLoaderHelper {

	static loadFile(file) {
		const reader = new FileReader();

		return new Promise((resolve, reject) => {
			reader.onload = (event) => resolve(event.target.result);
			reader.onerror = (error) => reject(error);
			reader.readAsDataURL(file);
		});
	}

}


export default FileLoaderHelper;
