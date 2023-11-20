import useGetDataUser from "../hooks/useDataUser";

const CreatePost = () => {
  const { formData, setFormData, handleChange, handleSubmit } =
    useGetDataUser();

  return (
    <div className=" mx-auto mt-8 p-4 bg-white rounded-md shadow-md mb-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="mb-4">
            <label
              htmlFor="caption"
              className="block text-sm font-medium text-gray-600"
            >
              Caption
            </label>
            <input
              type="text"
              id="caption"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-600"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-7"
            >
              Create Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
