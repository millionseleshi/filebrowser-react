import TreeView from "../TreeView/TreeView"

const Sidebar = () => {
return(<>
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
  
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <TreeView/>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
     
    </ul>
  </div>

</div>
</>)
}

export default Sidebar
