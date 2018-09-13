import * as React from 'react';

export interface BarProps {
	text: string;
}

export class Bar extends React.Component<BarProps> {
	constructor(props: BarProps) {
		super(props);
	}
	getFirstWord(): string {
		let wordArray = this.props.text.split(' ');
		return wordArray[0];
	}
	getAllWithoutFirst(): string {
		let wordArray = this.props.text.split(' ');
		let lastWords = "";
		for (let index = 1; index < wordArray.length; index++) {
			lastWords += wordArray[index] + " ";
		}
		return lastWords;
	}


	render() {
		return (
			<div id='textcolor'>
				<span id='primary'>{this.getFirstWord()}</span><br />
				<span id='secondary'>{this.getAllWithoutFirst()}</span>
			</div >
		);
	}
}