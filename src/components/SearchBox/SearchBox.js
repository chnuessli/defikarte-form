import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ListGroup, ListGroupItem, Overlay, OverlayTrigger } from "react-bootstrap";

const SearchBox = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState('');
  const target = useRef(null);

  const search = async (text) => {
    try {
      var response = await axios.get(`https://api3.geo.admin.ch/rest/services/api/SearchServer?type=locations&searchText=${text}`);
      setSearchResult(response.data.results);
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (searchText !== '') {
      search(searchText);
    }
    else {
      setSearchResult([]);
    }
  }, [searchText])

  const resultsRendering = (results) => {
    return results.map(x => {
      return (
        <>
          <ListGroup.Item dangerouslySetInnerHTML={{ __html: x.attrs.label }} ></ListGroup.Item>
        </>
      );
    });
  }

  return (
    <div className="border border-danger">
      <input ref={target} placeholder="search" className="border border-warning w-100 form-control" value={searchText} onChange={e => setSearchText(e.target.value)} />
      <Overlay
        className=""
        target={target.current}
        show={true}
        placement="bottom">
        <div className="margin-auto" style={{ zIndex: 1000, backgroundColor: 'black', height: '400px', overflow: 'auto', width: '98%' }}>
          <p>Test</p>
        </div>
      </Overlay>
    </div>
  );
}

export default SearchBox;

/*
          <ListGroup className="w-50" style={{ zIndex: 600, maxHeight: '20%', overflow: 'auto' }}>
            <ListGroup.Item><b>Test </b>Test</ListGroup.Item>
            <ListGroup.Item>Test</ListGroup.Item>
            <ListGroup.Item>Test</ListGroup.Item>
            <ListGroup.Item>Test</ListGroup.Item>
            <ListGroup.Item>Test</ListGroup.Item>
            <ListGroup.Item>Test</ListGroup.Item>
            <ListGroup.Item>Test1000</ListGroup.Item>
            {resultsRendering(searchResult)}
          </ListGroup>
        </>
        */