import { Icon, Input, Modal, Pagination, Table } from "antd";
import { useState } from "react";

const BlogList = ({ blogs, title }) => {
  const { TextArea } = Input;
  const [dataSource, setDataSource] = useState(blogs);
  const [isVisible, setIsVisible] = useState(false);
  const [editId, setEditId] = useState(0);

  const [blogTitle, setBlogTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [blogImage, setBlogImage] = useState("")
  const [imagePreview, setImagePreview] = useState(false)

  const columns = [
    // {
    //   key: "1", // unique identifier
    //   title: "No.", // title you want on the table
    //   dataIndex: "id", // from the json
    // },
    {
      key: "1",
      title: "Image",
      dataIndex: "url",
      render : image => 
        <img 
          src = {image} 
          alt = "image"
          style = {{ width : 20 }} 
          onClick = { () => {handleImage(image)} }
        />
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
    },
    // {
    //   key: "3",
    //   title: "Author",
    //   dataIndex: "author",
    // },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <span>
          <Icon onClick={() => onEdit(record)} type="eye" />
          <Icon
            onClick={() => onDelete(record)}
            type="delete"
            style={{ color: "red", marginLeft: 12 }}
          />
        </span>
      ),
    },
  ];

  const onDelete = (record) => {
    console.log("The record is", record.id);
    Modal.confirm({
      title: "Are you sure you want to delete this?",
      okType: "danger",
      okText: "Delete",
      onOk: async () => {
        try {
          await fetch(`http://localhost:3000/blogs/${record.id}`, {
            method: "DELETE",
          });

          const updatedDataSource = dataSource.filter(
            (item) => item.id !== record.id
          );
          setDataSource(updatedDataSource);
        } catch (error) {
          console.log("Error on delete", error);
        }
      },
    });
  };

  const onEdit = (record) => {
    setBlogTitle(record.title);
    setContent(record.content);
    setAuthor(record.author);
    setEditId(record.id)

    setIsVisible(true);
  };

  const onSave = async () => {
    try {
      const updatedBlog = {
        title: blogTitle,
        content: content,
        author: author,
      };
  
      const response = await fetch(`http://localhost:3000/blogs/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update the blog: ${response.status}`);
      }
  
      // Update the dataSource with the updated blog
      const updatedDataSource = dataSource.map((item) =>
        item.id === editId ? { ...item, ...updatedBlog } : item
      );
      setDataSource(updatedDataSource);
  
      setIsVisible(false);
    } catch (error) {
      console.error("Error on save", error);
    }
  };

  const handleTable = (value) => {
    console.log(value);
  }

  const handleImage = (image) => {
    console.log("Clicked the image",image);
    setBlogImage(image)
    setImagePreview(true)
  }

  const handleRow = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.title === 'accusamus ea aliquid et amet sequi nemo', // Column configuration not to be checked
      title: record.title,
    }),
  };

  return (
    <>
      <h2>{title}</h2>
      <Table 
        onChange={handleTable} 
        columns={columns} 
        dataSource={dataSource} 
        rowSelection={handleRow}
        scroll={{ y: 500 }}
        expandedRowRender={record => <a href={record.thumbnailUrl}>{record.thumbnailUrl}</a>}
        pagination={{
        //pageSize : 10,
        hideOnSinglePage: true,
        showQuickJumper : true,
        showSizeChanger : true,
        pageSizeOptions : ['10', '20', '30'],
        size : "small"
      }} />
      <Modal
        title="Edit Blog"
        visible={isVisible}
        okText="Save"
        onCancel={() => {
          setIsVisible(false);
        }}
        onOk={() => {
          setIsVisible(false);
          onSave()
        }}
      >
        <label>Blog Title</label>
        <Input
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          placeholder="Title"
        />
        <label>Blog Content</label>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />

        <label>Blog Author</label>
        <Input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
      </Modal>

      { imagePreview && 
      <Modal
        title="Image Preview"
        visible={imagePreview}
        okText="Done"
        onCancel={() => {
          setImagePreview(false);
        }}
        onOk={() => {
          setImagePreview(false);
        }}
        maskClosable = {true}
        // bodyStyle={{
        //   backgroundColor: 'transparent',
        //   opacity : 1
        // }}
      >
        <img src={blogImage} alt="Image Preview" style={{ maxWidth: "100%" }}></img>
      </Modal> 
      }
      
    </>
    // <div className="blog-list">
    //     <h2>{ title }</h2>
    //     {blogs.map((blog) => (
    //     <div className="blog-preview" key={blog.id}>
    //         <h2>{blog.title}</h2>
    //         <p>{blog.content}</p>
    //         <p>Written by: {blog.author}</p>
    //     </div>
    // ))}
    // </div>
  );
};

export default BlogList;
