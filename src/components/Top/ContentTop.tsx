import React from 'react';

interface Props {

}

const ContentTop: React.FC<Props> = (Props): JSX.Element => {
    return (
        <div id="top">
            <div className="content">
                <div className="text">
                    <h1 className="header">Umbruchszeiten</h1>
                    <p className="Beschreibung">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo provident nulla dolorem, magnam architecto quisquam aspernatur mollitia vitae quod, obcaecati, vel autem eos at quae tempore sed consectetur dolorum inventore qui. Quod rem eos consequuntur numquam nisi laudantium, nulla sapiente explicabo doloremque, sed saepe tenetur in dolorum aut voluptates quasi iusto corporis perferendis ipsum, laboriosam adipisci deleniti consequatur tempore qui? Illo ab explicabo beatae dolorum voluptatem suscipit incidunt impedit itaque quo vel, a, expedita quod ipsam, deserunt tenetur asperiores quae dolorem maxime eligendi laboriosam nisi fuga recusandae. Aperiam voluptate asperiores pariatur facilis totam quo maiores, quisquam vero repudiandae nesciunt quaerat?
                    </p>
                    <div className="watchVideo">
                        <svg xmlns="http://www.w3.org/2000/svg" className="playSVG" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="none" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 4v16l13 -8z" /></svg>
                        <h2>Watch Video</h2>
                    </div>
                </div>
                <div id="logoWrapper">
                    <img id="logo" src={require("../../assets/logo1.png")} alt="asldf"></img>
                </div>
            </div>

        </div>
    )
}

export default ContentTop;