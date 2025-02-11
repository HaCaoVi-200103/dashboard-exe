import{b as M,r as s,j as e,c as _}from"./index-BwRHFkgU.js";import{M as b,h as F,j as k,c as w,T as A,d as O,P as T,e as z,k as v,f as R,l as D}from"./category-Ck3erg1v.js";import{F as x,I as P,s as C}from"./customize-BKYyfSLo.js";import{B as E}from"./index-CHWnmAr0.js";import"./index-D8Z8VUQ6.js";const L=u=>{const{isCreateModalOpen:r,setIsCreateModalOpen:t}=u,{refreshProduct:m,setRefreshProduct:g,refreshCategory:p,setRefreshCategory:n}=M(),[c]=x.useForm(),[l,d]=s.useState(!1),y=()=>{c.resetFields(),d(!1),t(!1)},f=async o=>{d(!0);try{const i=await F(o.cate_name);if(i.statusCode===201){C.success({message:i.message}),d(!1),c.resetFields(),g(!m),n(!p),t(!1);return}C.error({message:i.message})}catch(i){console.log(i)}};return e.jsx("div",{children:e.jsx(b,{style:{top:50},title:"Add new product",open:r,onOk:()=>c.submit(),onCancel:()=>y(),maskClosable:!1,loading:l,children:e.jsx(x,{name:"basic",onFinish:f,layout:"vertical",form:c,children:e.jsx(x.Item,{hasFeedback:!0,label:"Category name",name:"cate_name",rules:[{required:!0,message:"Please input your category name!"}],children:e.jsx(P,{})})})})})},U=u=>{const{isUpdateModalOpen:r,dataCate:t,setIsUpdateModalOpen:m}=u,{refreshCategory:g,setRefreshCategory:p}=M(),[n]=x.useForm(),[c,l]=s.useState(!1),d=()=>{n.resetFields(),l(!1),m(!1)},y=async f=>{l(!0);try{const o=await k(t._id,f.cate_name);if(o.statusCode===200){C.success({message:o.message}),l(!1),n.resetFields(),p(!g),m(!1);return}C.error({message:o.message})}catch(o){console.log(o)}};return s.useEffect(()=>{n.setFieldValue("cate_name",t==null?void 0:t.cate_name)},[r,t]),e.jsx("div",{children:e.jsx(b,{style:{top:50},title:"Add new product",open:r,onOk:()=>n.submit(),onCancel:()=>d(),maskClosable:!1,loading:c,children:e.jsx(x,{name:"basic",onFinish:y,layout:"vertical",form:n,children:e.jsx(x.Item,{hasFeedback:!0,label:"Category name",name:"cate_name",rules:[{required:!0,message:"Please input your category name!"}],children:e.jsx(P,{})})})})})},B=u=>{const{dataSource:r,meta:t}=u,[m,g]=s.useState(r),[p,n]=s.useState(t),[c,l]=s.useState(!1),[d,y]=s.useState(!1),[f,o]=s.useState(null),{refreshProduct:i,setRefreshProduct:j}=M();s.useEffect(()=>{(async()=>(n(t),g(r)))()},[r,t]);const I=async h=>{try{const a=await v(h);if(a.statusCode===200){j(!i),C.success({message:a.message});return}C.error({message:a.message})}catch(a){console.log(a)}},S=[{title:"Name",dataIndex:"cate_name",key:"pro_name"},{title:"Product",dataIndex:"product_count",key:"pro_picture",render:h=>e.jsx("div",{children:h})},{title:"Action",dataIndex:"is_deleted",key:"is_deleted",render:(h,a)=>e.jsxs("div",{style:{display:"flex",gap:20,justifyContent:"start"},children:[e.jsx(O,{style:{fontSize:20},onClick:()=>{y(!0),o(a)}}),e.jsx(T,{title:"Are you sure delete category?",onConfirm:()=>I(a._id),cancelText:"No",children:e.jsx(z,{style:{fontSize:20},twoToneColor:"#F04770"})})]})}];return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,fontWeight:600,fontSize:20},children:[e.jsx("span",{children:"Manage Category"}),e.jsxs(E,{onClick:()=>l(!0),children:[e.jsx(w,{}),e.jsx("span",{children:"Add New"})]})]}),e.jsx(A,{columns:S,dataSource:m,meta:p}),e.jsx(L,{isCreateModalOpen:c,setIsCreateModalOpen:l}),e.jsx(U,{dataCate:f,isUpdateModalOpen:d,setIsUpdateModalOpen:y})]})},G=()=>{const[u]=_(),r=u.get("current")||"1",t=u.get("pageSize")||"5",[m,g]=s.useState([]),[p,n]=s.useState({current:1,pageSize:10,total:1}),{refreshProduct:c}=M(),[l,d]=s.useState(!1);return s.useEffect(()=>{(async()=>{var f,o,i,j,I,S,h;try{d(!1);const a=await D(+r,+t);if(a.statusCode!==200)return C.warning({message:"Can't take data category"});g(((f=a.data)==null?void 0:f.result)||[]),n({current:((i=(o=a.data)==null?void 0:o.meta)==null?void 0:i.current)||1,pageSize:((I=(j=a.data)==null?void 0:j.meta)==null?void 0:I.pageSize)||10,total:((h=(S=a.data)==null?void 0:S.meta)==null?void 0:h.total)||1}),d(!0)}catch(a){console.log(a)}})()},[r,t,c]),l?e.jsx("div",{children:e.jsx(B,{metaDefault:{current:+r,LIMIT:+t},dataSource:m||[],meta:p})}):e.jsx(R,{})};export{G as default};
