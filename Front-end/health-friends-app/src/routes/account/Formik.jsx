// import { Formik, Form, useField } from 'formik';
// import * as Yup from 'yup';
// import {Grid, Button, Box} from '@mui/material'
// import TextField from '@mui/material/TextField';
// import { useState, React } from 'react';

// const MyTextInput = ({ label, ...props }) => {
//   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//   // which we can spread on <input>. We can use field meta to show an error
//   // message if the field is invalid and it has been touched (i.e. visited)
//   const [field, meta] = useField(props);
//   return (
//     <Box sx={{m:0.5, width: '50%' }} >
//       <TextField label={label} 
//       variant="outlined" 
//       {...field} {...props}
//       required
//       fullWidth
//       />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </Box>
//   );
// };

// const MyCheckbox = ({ children, ...props }) => {
//   // React treats radios and checkbox inputs differently other input types, select, and textarea.
//   // Formik does this too! When you specify `type` to useField(), it will
//   // return the correct bag of props for you -- a `checked` prop will be included
//   // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
//   const [field, meta] = useField({ ...props, type: 'checkbox' });
//   return (
//     <Box sx={{m:1.5, }}>
//       <label className="checkbox-input">
//         <input type="checkbox" {...field} {...props} />
//         {children}
//       </label>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </Box>
//   );
// };

// const MySelect = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <div>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <select {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

// // And now we can use these
// const SignupForm = () => {
//   const [isEmailValid, setIsEmailValid] = useState(false);
//   const [isNicknameValid, setIsNicknameValid] = useState(false);

//   return (
//     <>
//       <Formik
//         initialValues={{
//           name: '',
//           nickname: '',
//           email: '',
//           password:'',
//           passwordConfirm:'',
//           acceptedTerms: false, // added for our checkbox
//         }}
//         validationSchema={Yup.object({
//           name: Yup.string()
//             .max(15, 'Must be 15 characters or less')
//             .required('필수값입니다'),
//           nickname: Yup.string()
//             .max(20, 'Must be 20 characters or less')
//             .required('필수값입니다'),
//           email: Yup.string()
//             .email('Invalid email address')
//             .required('필수값입니다'),
//           acceptedTerms: Yup.boolean()
//             .required('필수값입니다')
//             .oneOf([true], 'You must accept the terms and conditions.'),
//           jobType: Yup.string()
//             .oneOf(
//               ['designer', 'development', 'product', 'other'],
//               'Invalid Job Type'
//             ),
//           password: Yup.string()
//             .max(20, 'Must be 20 characters or less')
//             .required('필수값입니다')
//             .min(8, 'Must be 8 characters or more')
//             .matches(/[A-Za-z]/,'문자를 포함해야합니다')
//             .matches(/\d/,'숫자를 포함해야합니다')
//             .matches(/\W/,'특수문자를 포함해야합니다'),
//           passwordConfirm: Yup.string()
//             .oneOf([Yup.ref('password'), null], 'Passwords must match')
//             .required('필수값입니다')
//         })}
//         // onSubmit={(values, { setSubmitting }) => {
//         //   setTimeout(() => {
//         //     alert(JSON.stringify(values, null, 2));
//         //     setSubmitting(false);
//         //   }, 400);
//         // }}
//         onSubmit={(values, { setSubmitting }) => {
//           //닉네임중복확인
//           //이메일중복확인
//           //이메일인증번호
//           //완료
//         }}
        
//       >
//         <Form>
//           <Box sx={{ display: 'flex', flexDirection: 'column', 
//            alignItems: 'flex-start', m:3 }}>
//             <MyTextInput
//               label="이름"
//               name="name"
//               type="text"
//               autoFocus
//             />

//             <MyTextInput
//               label="닉네임"
//               name="nickname"
//               type="text"
//             />
        
//             <MyTextInput
//               label="이메일"
//               name="email"
//               type="email"
//             />
          
//             <MyTextInput
//               label="비밀번호"
//               name="password"
//               type="password"
//             />

//             <MyTextInput
//               label="비밀번호확인"
//               name="passwordConfirm"
//               type="password"
//             />
          
//             {/* <MySelect label="Job Type" name="jobType">
//               <option value="">Select a job type</option>
//               <option value="designer">Designer</option>
//               <option value="development">Developer</option>
//               <option value="product">Product Manager</option>
//               <option value="other">Other</option>
//             </MySelect> */}
          
//             <MyCheckbox name="acceptedTerms">
//               I accept the terms and conditions
//             </MyCheckbox>
          
//             <Button variant="contained" sx={{width:50}} type='submit'>Submit</Button>
//           </Box>
//         </Form>
//       </Formik>
//     </>
//   );
// };


// export default SignupForm