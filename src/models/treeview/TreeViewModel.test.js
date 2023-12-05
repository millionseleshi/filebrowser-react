import { when } from "mobx"
import {TreeViewModel} from "./TreeViewModel"
it("should create tree view model",(done)=>{
    when(()=>{
        const node = { id: "1",children: [{ id: "2" }] };
        const treeView=TreeViewModel.create(node)
        expect(treeView.id).toBe("1")
    })
    done()
})