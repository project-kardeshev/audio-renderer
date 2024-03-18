import { ReactNode, memo } from "react";
import "./index.scss";

const Placeholder = ({ children }: { children: ReactNode }) => {
    return (
        <div className="placeholder">
            <span className="iconfont icon-loading" />
            <span>Loading... {children}</span>
        </div>
    );
};

export default memo(Placeholder);
