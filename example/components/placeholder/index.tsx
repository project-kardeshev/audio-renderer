import { memo } from "react";
import "./index.scss";

const Placeholder = ({ children }) => {
    return (
        <div className="placeholder">
            <span className="iconfont icon-loading" />
            <span>Loading... {children}</span>
        </div>
    );
};

export default memo(Placeholder);
