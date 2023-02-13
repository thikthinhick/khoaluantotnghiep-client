import React, { useState } from "react";
import { ButtonPrimary } from "../../components/button/Button";
import MultiSelect from "../../components/multiselectcheckbox/MultiSelectCheckboxs";
const options = [
  { name: "Facilities", value: "facilities" },
  { name: "Finance", value: "finance" },
  { name: "Front Office", value: "front_office" },
  { name: "Human Resources", value: "human_resources" },
  { name: "IT", value: "it" },
  { name: "Management Team", value: "management_team" },
  { name: "Planning", value: "planning" },
  { name: "Sales", value: "sales" },
];
const defaultValues = [
  { name: "Management Team", value: "management_team" },
  { name: "Sales", value: "sales" },
];
function EditRoom({ close }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleMultiChange = (options) => {
    setSelectedOptions(options);
  };
  return (
    <div className="modal-popup">
      {/* <button className="close-popup" onClick={close}>
        &times;
      </button> */}
      <div className="header-popup">Tạo phòng mới</div>
      <div className="content-popup">
        {" "}
        <label style={{ fontWeight: "bold" }}>Tên phòng mới:</label>
        <div class="input-group mb-3">
          <input
            style={{ fontSize: "13px", borderRadius: "0px", outline: "none" }}
            type="text"
            outline={"none"}
            class="form-control"
            placeholder="Nhập tên phòng"
          />
        </div>
        <label style={{ fontWeight: "bold" }}>
          Chọn danh sách người điều khiển:
        </label>
        <div class="input-group mb-3">
          <MultiSelect
            options={options}
            defaultValues={defaultValues}
            name="department"
            onChange={handleMultiChange}
          />
        </div>
        <div className="d-flex mt-2" style={{ justifyContent: "center" }}>
          <ButtonPrimary title={"TẠO PHÒNG"} />
        </div>
      </div>
    </div>
  );
}

export default EditRoom;
