import React, { useContext } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import FavoriteContext from "../../../contexts/FavoriteContext";
import StarIcon from "../../../components/atoms/StarIcon";
import Button from "../../atoms/Button";

export const FavoriteButtonPresenter = ({
    className,
    isFavorite,
    onClick,
}) => (
    <Button
        className={className}
        onClick={onClick}
        size="s"
    >
        <StarIcon on={isFavorite} />
        お気に入り
    </Button>
);

FavoriteButtonPresenter.propTypes = {
    className: PropTypes.string,
    isFavorite: PropTypes.bool,
    onClick: PropTypes.func,
};

FavoriteButtonPresenter.defaultProps = {
    className: "",
    isFavorite: false,
    onClick: null,
};