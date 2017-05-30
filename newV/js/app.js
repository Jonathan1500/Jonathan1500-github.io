"use strict";

var ContentBox  = React.createClass({displayName: 'ContentBoxWord',

    loadWordFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadWordFromServer();
    },

    //agrega jquery custom
    componentDidUpdate:function(){

    },

    render: function() {
        return (
            React.createElement("div", {className: "contentBox"},
                React.createElement(list_word, {data: this.state.data})

            )
        );
    }

});

var list_word = React.createClass({displayName: 'list_word',
    render: function() {
        var CitasText = this.props.data.map(function (data) {
            return (
                React.createElement(Comment, {titulo_cita:data.title,body_cita:data.body})
            );
        });
        return (
            React.createElement("div", {className: "list_word"},
                CitasText
            )
        );
    }

});

//estructura final html
var Comment = React.createClass({displayName: 'Comment',
    render: function() {
        return (
            React.createElement("div", {className: "row"},
                    React.createElement("h1", {className:"to-animate"},this.props.body_cita),
                    React.createElement("h2", {className:"to-animate"},this.props.titulo_cita)


            )
        );
    }
});

// Render our reactComponent
ReactDOM.render(
    React.createElement(ContentBox, {url: "json_file/citas-celebres.json"}),
    document.getElementById('ItemsCitas')
);
