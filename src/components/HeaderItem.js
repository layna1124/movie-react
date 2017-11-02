import React from 'react';
import {
  Link
} from 'react-router-dom'


const HeaderItem = ({
  label,
  linkTo,
  isActive,
}) => (
    <Link
      to={linkTo}
      className={`item ${isActive ? 'active' : ''}`}
    >
      {label}
    </Link>
  )

export default HeaderItem;

/* 해당페이지 메뉴 className="item active*/
