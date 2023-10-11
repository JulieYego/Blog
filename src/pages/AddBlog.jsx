import { Button, Input, Form, DatePicker, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import moment from "moment";

const AddBlog = (props) => {
  const { TextArea } = Input;
  const { getFieldDecorator } = props.form;
  const [isLoading, setIsLoading] = useState(false);
  const [blogDate, setBlogDate] = useState(null);

  const { Option, OptGroup } = Select

  const dateFormat = "DD/MM/YYYY";
  const monthFormat = "YYYY/MM";
  const { RangePicker } = DatePicker;

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      console.log("The props look like this", props);

      props.form.validateFields(async (err, values) => {
        if (!err) {
          console.log("Received values from form: ", values);
          values.date = blogDate;
          axios
            .post("http://localhost:3000/blogs", { ...values })
            .then((response) => {
              setIsLoading(false);
              console.log(response);
            })
            .catch((err) => console.log(err));
          // const response = await fetch(
          //   "http://localhost:3000/blogs",
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-type": "application/json",
          //     },
          //     body: JSON.stringify(values),
          //   }
          // );
          // if (!response.ok) {
          //   throw new Error(`HTTP error! Status: ${response.status}`);
          // }
          // const json = await response.json();
          // console.log(json);
          // setIsLoading(false)
        }
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  function handleDate(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  }

  function onOk(value) {
    console.log("onOk: ", value);
  }

  // disables today and dates before today
  const disableDate = (current) => {
    return current && current < moment().endOf('day')
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <div className="create">
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Blog Title">
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please input the title!",
              },
            ],
          })(<Input placeholder="Enter the title" />)}
        </Form.Item>

        <Form.Item label="Content">
          {getFieldDecorator("body", {
            rules: [
              {
                required: true,
                message: "Please input the blog content!",
              },
            ],
          })(<TextArea rows={4} placeholder="Type here..." />)}
        </Form.Item>

        <Form.Item label="Author">
          {getFieldDecorator("author", {
            rules: [
              {
                required: true,
                message: "Please input the author!",
              },
            ],
          })(<Input placeholder="Enter the author" />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("date", {
            rules: [
              {
                required: true,
                message: "Please input the date",
              },
            ],
          })(<DatePicker onChange={handleDate} />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("topic", {
            rules : [
              {
                required : true,
                message : "Please input the topic"
              }
            ]
          })(
            <Select  
              style={{ width: 120 }} 
              onChange={handleChange}
              mode="multiple"
              placeholder="Select an option"
              //optionLabelProp="label"
              >
                <OptGroup label="STEM">
                  <Option value="technology">Technology</Option>
                  <Option value="science">Science</Option>
                </OptGroup>

                <OptGroup label="Humanity">
                  <Option value="food" disabled>Food</Option>
                  <Option value="history">History</Option>
                </OptGroup>
            </Select> 
          )}
        </Form.Item>

        <DatePicker
          showTime
          placeholder="Select time"
          defaultValue={moment("1/09/2004", dateFormat)}
          format = "YYYY-MM-DD"
          disabledDate={disableDate}
          onChange={handleDate}
          onOk={onOk}
          disabled
        />

        <Form.Item>
          {!isLoading && <Button htmlType="submit"> Add Blog </Button>}
          {isLoading && <Button disabled> Adding Blog... </Button>}
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedForm = Form.create({ name: "add_blog" })(AddBlog);
export default WrappedForm;
