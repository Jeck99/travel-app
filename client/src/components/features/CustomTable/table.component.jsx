import React from "react";
import MUIDataTable from "mui-datatables";

export default function CostumeTable(props) {
    const { data, title, columns } = props;

    function deleteStudent(RowsDeleted, data) {
        const ids = RowsDeleted.data.map(d => d.dataIndex);
        console.log(data, ids);
        // removeMovie(params._id).then(res => alert(res))
    }
    const options = {
        filterType: "checkbox",
        onRowsDelete: deleteStudent
    }


    return (
        <MUIDataTable
            title={title}
            options={options}
            data={data}
            columns={columns}
        />
    )
}
