import BlogList from "../components/BlogList";
import useFetch from "../hooks/useFetch";

const Home = () => {
    const {data : blogs, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/photos')
    
    return ( 
        <div className="home">
            { isLoading && <div>Loading...</div> }
            { error && <div>{error}</div> }
            { blogs && <BlogList blogs={blogs} title={"All Blogs"} />}
        </div>
    );
}
 
export default Home;