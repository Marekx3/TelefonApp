import * as React from 'react';
import { AddFriend } from '../AddFriend/AddFriend';
import { ShowList } from '../ShowList/ShowList';
import { TelefonItem } from '../../model/TelefonItem';
import { TelefonService } from '../../services/TelefonService';

export interface FriendsContainerState {
	list: TelefonItem[];
	origin: TelefonItem;
	newFriend: TelefonItem;
	isEdit: boolean;
	isTelefonlistLoaded: boolean;
}

export class FriendsContainer extends React.Component<{}, FriendsContainerState> {
	private telefonService = new TelefonService();
	constructor(props: any) {
		super(props);
		this.state = {
			list: [],
			origin: {
				id: null,
				name: "",
				telefon: ""
			},
			newFriend: {
				id: null,
				name: "",
				telefon: ""
			},
			isEdit: false,
			isTelefonlistLoaded: false
		};
		this.loadTelefonliste = this.loadTelefonliste.bind(this);
		this.setOrigin = this.setOrigin.bind(this);
		this.updateNewFriend = this.updateNewFriend.bind(this);
		this.updateNewNumber = this.updateNewNumber.bind(this);
		this.handleAddNew = this.handleAddNew.bind(this);
		this.setEdit = this.setEdit.bind(this);
		this.setEmptyState = this.setEmptyState.bind(this);
	}

	componentDidMount(): void {
		this.loadTelefonliste();
	}

	async loadTelefonliste(): Promise<void> {
		this.setState({
			isTelefonlistLoaded: false
		});
		let newList = await this.telefonService.loadTelefonliste();
		this.setState({
			list: newList,
			isTelefonlistLoaded: true
		});
	}

	setOrigin(origin: TelefonItem): void {
		this.setState({
			origin: origin,
			newFriend: {
				...origin
			}
		})
	}

	setEdit(isEdit: boolean): void {
		this.setState({
			isEdit: isEdit
		})
	}

	updateNewFriend(e: any): void {
		let newFriend = this.state.newFriend
		newFriend.name = e.target.value
		this.setState({
			newFriend: newFriend
		})
	}

	updateNewNumber(e: any): void {
		let newFriend = this.state.newFriend
		newFriend.telefon = e.target.value
		this.setState({
			newFriend: newFriend
		})
	}

	async handleAddNew(): Promise<void> {
		if (this.state.origin.id) {
			await this.telefonService.updateTelefonItem(this.state.origin.id, this.state.newFriend);
		} else {
			if (this.state.newFriend.name && this.state.newFriend.telefon) {
				await this.telefonService.addTelefonItem(this.state.newFriend);
			} else {
				console.log("mach gar nichts");
			}
		}
		this.setEmptyState();
		await this.loadTelefonliste();
	}

	setEmptyState(): void {
		this.setState({
			newFriend: {
				id: null,
				name: "",
				telefon: ""
			},
			origin: {
				id: null,
				name: "",
				telefon: ""
			}
		})
	}

	render(): JSX.Element {
		return (
			<div>
				<AddFriend
					daten={this.state}
					updateNewFriend={this.updateNewFriend}
					updateNewNumber={this.updateNewNumber}
					handleAddNew={this.handleAddNew}
					isEdit={this.state.isEdit}
				/>
				<ShowList
					names={this.state.list}
					removeNumber={(list: TelefonItem[]) => this.setState({ list: list })}
					deleteTelefonItem={this.telefonService.deleteTelefonItem}
					setOrigin={this.setOrigin}
					daten={this.state}
					updateNewFriend={this.updateNewFriend}
					updateNewNumber={this.updateNewNumber}
					handleAddNew={this.handleAddNew}
					setEdit={this.setEdit}
					setEmptyState={this.setEmptyState}
					isTelefonlistLoaded={this.state.isTelefonlistLoaded}
				/>
			</div>
		)
	}
}