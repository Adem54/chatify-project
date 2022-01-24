import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { Form, Button, Grid, Message } from "semantic-ui-react";
import styles from "./login.module.css";
import { useForm } from "react-hook-form";

const Login = () => {
  const firebase = useFirebase();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [fbErrors, setFbErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const submitForm = ({ email, password },e) => {
    setSubmitting(true);
    setFbErrors([]);
    firebase
      .login({email, password})
      .then((data) => {
        console.log("data: ", data.user.user);
        // setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        console.log("error: ", error);
        setFbErrors([{ message: error.message }]);
      })
      .finally(() => {
        setSubmitting(false); //Bestractise-setSubmiting i hem then hem catch de yazmak yerine 1 kez burda yazariz cunku burasi ister form success isterse error olsun her turlu calisacak dolayisi ile biz ister responseumuz success isterse de error olsun her iki durumda da calistirmak istedigimiz kodlari burda 1 kez yazabiliriz
      });
  };
  const displayErrors = () => {
    return fbErrors.map((error, index) => <p key={index}>{error.message}</p>);
  };
  return (
    <React.Fragment>
      <Grid
        textAlign="center"
        verticalAlign="middle"
        className={styles.container}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <h1 className={styles.formHeader}>
            Chatify
            <span>.io</span>
          </h1>
          <Form
            size="large"
            className={styles.form}
            onSubmit={handleSubmit(submitForm)}
          >
            <Form.Field>
              <input
                icon="mail"
                name="email"
                id="email"
                placeholder="Email adress"
                type="email"
                {...register("email", { required: true })}
              />
            </Form.Field>
            <Form.Field>
              <input
                name="password"
                id="password"
                placeholder="Password"
                type="password"
                {...register("password", { required: true })}
              />
            </Form.Field>

            <Button color="purple" fluid size="large" disabled={submitting}>
              Sign In
            </Button>
          </Form>

          {
          fbErrors.length>0 && (
            <Message error>{displayErrors()}</Message>
          )
        }
        
          <Message>
            Are you new here?
            <Link to="/signup"> Create Account</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

export default Login;

/*

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    triggerValidation
  } = useForm();

  const onSubmit = (data, event) => {
    //data da UseForm dan geliyor
    console.log("data: ", data);
  };

  useEffect(() => {
    register({ name: "email" }, { required: true });
    register({ name: "passsord" }, { required: true, minLength: 6 });
  }, []);

  return (
    <React.Fragment>
      <Grid
        textAlign="center"
        verticalAlign="middle"
        className={styles.container}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <h1 className={styles.formHeader}>
            Chatify
            <span>.io</span>
          </h1>
          <Form
            size="large"
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Segment>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                name="email"
                onChange={async (e, { name, value }) => {
                    setValue(name, value);
                    await triggerValidation({ name });
                  }}
                placeholder="Email adress"
                type="email"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                onChange={async (e, { name, value }) => {
                    setValue(name, value);
                    await triggerValidation({ name });
                  }}
                placeholder="Password"
                type="password"
              />
              <Button color="purple" fluid size="large">
                Sign In
              </Button>
            </Segment>
          </Form>
          <Message>
            Are you new here?
            <Link to="/signup"> Create Account</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};


*/

/*
const Login = () => {
 

  return (
    <React.Fragment>
      <Grid
        textAlign="center"
        verticalAlign="middle"
        className={styles.container}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <h1 className={styles.formHeader}>
            Chatify
            <span>.io</span>
          </h1>
          <Form
            size="large"
            className={styles.form}
           
          >
            <Segment>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                name="email"
               
                placeholder="Email adress"
                type="email"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
               
                placeholder="Password"
                type="password"
              />
              <Button color="purple" fluid size="large">
                Sign In
              </Button>
            </Segment>
          </Form>
          <Message>
            Are you new here?
            <Link to="/signup"> Create Account</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

*/
