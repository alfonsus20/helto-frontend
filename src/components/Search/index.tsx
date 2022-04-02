import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";

import Input from "../Input";
import { SearchIcon } from "@heroicons/react/outline";

import useEffectOnce from "../../hooks/useEffectOnce";

type SearchProps = {
  fetchFunc: () => void;
  placeholder: string;
  className?: string;
};

const Search = ({ fetchFunc, placeholder, className }: SearchProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handleSearch = (evt: React.FormEvent) => {
    evt.preventDefault();
    const currParams = qs.parse(search);
    navigate(`${pathname}?${qs.stringify({ ...currParams, keyword })}`);
  };

  useEffectOnce(() => {
    const keywordFromURL = qs.parse(search)["keyword"];
    if (keywordFromURL) {
      setKeyword(keywordFromURL.toString());
    }
  });

  useEffect(() => {
    fetchFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <form onSubmit={handleSearch}>
      <Input
        placeholder={placeholder}
        icon={<SearchIcon className="w-5 h-5" />}
        className={className}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );
};

export default Search;
