import React from "react";

import {useState, useEffect} from "react";
import axios from "axios";
import "./SearchAutoComplete.css";

function SearchAutoComplete() {
    const [users, setUsers] = useState<any>([]);
    const [text, setText] = useState("");
    const [suggestions, setSuggestions] = useState<any>([]);

    useEffect(() => {
        const loadUsers = async () => {
            const response = await axios.get("https://reqres.in/api/users");
            setUsers(response.data.data);
        };
        loadUsers();
    }, []);

    const onSuggestHandler = (text: string) => {
        setText(text);
        setSuggestions([]);
    };

    const onChangeHandler = (text: string) => {
        let matches: any = [];
        if (text.length > 0) {
            matches = users.filter((user: any) => {
                const regex = new RegExp(`${text}`, "gi");
                return user.email.match(regex);
            });
        }
        console.log("matches", matches);
        setSuggestions(matches);
        setText(text);
    };

    return (
        <div>
            <input
                type="text"
                style={{height: 30, margin: 10}}
                onChange={(e) => onChangeHandler(e.target.value)}
                value={text}
                onBlur={() => {
                    setTimeout(() => {
                        setSuggestions([]);
                    }, 100);
                }}
            />

            {suggestions &&
            suggestions.map((suggestion: any, i: any) => (
                <div
                    key={i}
                    className="suggestion"
                    style={{height: 30, margin: 10}}
                    onClick={() => onSuggestHandler(suggestion.email)}
                >
                    {suggestion.email}
                </div>
            ))}
        </div>
    );
}

export default SearchAutoComplete;
