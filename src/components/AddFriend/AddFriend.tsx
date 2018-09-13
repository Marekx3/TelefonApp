import * as React from 'react';
import { FriendsContainerState } from '../FriendsContainer/FriendsContainer';
import Button from '@atlaskit/button';
import { FieldTextStateless } from '@atlaskit/field-text';

export interface AddFriendProps {
	updateNewFriend: (e: any) => void;
	updateNewNumber: (e: any) => void;
	daten: FriendsContainerState;
	handleAddNew: () => void;
	isEdit: boolean;
}

export class AddFriend extends React.Component<AddFriendProps> {
	constructor(props: AddFriendProps) {
		super(props)
		this.updateNewFriend = this.updateNewFriend.bind(this)
		this.updateNewNumber = this.updateNewNumber.bind(this)
	}

	updateNewFriend(e: any): void {
		this.props.updateNewFriend(e);
	}

	updateNewNumber(e: any): void {
		this.props.updateNewNumber(e);
	}

	getOriginName(): string {
		return this.props.daten.origin.name;
	}

	getOriginTelefon(): string {
		return this.props.daten.origin.telefon;
	}

	checkEdit(): boolean {
		if (this.props.isEdit) {
			return true;
		} else {
			return false;
		}
	}

	render(): JSX.Element {
		return (
			<div>
				<FieldTextStateless
					label='Vorname Nachname'
					type="text"
					value={this.props.daten.newFriend.name}
					onChange={this.updateNewFriend}
					placeholder="Name"
					isReadOnly={this.checkEdit()}
					required
				/>
				<FieldTextStateless
					label='Telefonnummer'
					type="text"
					value={this.props.daten.newFriend.telefon}
					onChange={this.updateNewNumber}
					placeholder="Telefon"
					isReadOnly={this.checkEdit()}
					required
				/>
				<Button
					appearance='default'
					isDisabled={this.props.daten.newFriend.name && this.props.daten.newFriend.telefon && !this.props.isEdit ? false : (this.getOriginName() && this.getOriginTelefon() && !this.props.isEdit ? false : true)}
					onClick={this.props.handleAddNew}
				>
					Speichern
				</Button>
			</div >
		);
	}
}