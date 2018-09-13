import * as React from 'react';
import { TelefonItem } from '../../model/TelefonItem';
import Button from '@atlaskit/button';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import Pencil from '@atlaskit/icon/glyph/edit-filled';
import TableTree, { Headers, Header, Rows, Row, Cell } from '@atlaskit/table-tree';
import { FieldTextStateless } from '@atlaskit/field-text';
import { FriendsContainerState } from '../FriendsContainer/FriendsContainer';
import Tick from '@atlaskit/icon/glyph/check';
import Cross from '@atlaskit/icon/glyph/cross';
import Spinner from '@atlaskit/spinner';

export interface ShowListProps {
	names: TelefonItem[];
	removeNumber: (e: TelefonItem[]) => void;
	setOrigin: (e: TelefonItem) => void;
	deleteTelefonItem: (e: number) => void;
	updateNewFriend: (e: string) => void;
	updateNewNumber: (e: string) => void;
	daten: FriendsContainerState;
	handleAddNew: () => void;
	setEdit: (isEdit: boolean) => void;
	setEmptyState: () => void;
	isTelefonlistLoaded: boolean;
}

export interface ShowListState {
	id: number;
}

export class ShowList extends React.Component<ShowListProps, ShowListState> {
	constructor(props: ShowListProps) {
		super(props)
		this.state = {
			id: null
		}

		this.deleteEintrag = this.deleteEintrag.bind(this);
		this.updateEintrag = this.updateEintrag.bind(this);
		this.updateNewFriend = this.updateNewFriend.bind(this);
		this.updateNewNumber = this.updateNewNumber.bind(this);
		this.setStateClose = this.setStateClose.bind(this);
	}

	deleteEintrag(e: number): void {
		let list = this.props.names;
		this.props.deleteTelefonItem(e);
		let deleteIndex = list.findIndex(index => index.id === e);
		list.splice(deleteIndex, 1);
		this.props.removeNumber(list);
	}

	updateEintrag(e: number): void {
		let list = this.props.names;
		let origin = list.find(index => index.id === e);
		this.props.setOrigin(origin);
		if (!this.props.daten.isEdit) {
			this.setState({
				id: e
			});
			this.props.setEdit(true);
		} else {
			if (e === this.state.id) {
				this.props.handleAddNew();
				this.setStateClose();
			} else {
				this.setState({
					id: e
				});
			}
		}
	}

	setStateClose(): void {
		this.setState({
			id: null
		})
		this.props.setEdit(false);
		this.props.setEmptyState();
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

	renderEdit(name: string, text: string, id: number): JSX.Element {
		if (this.props.daten.isEdit && id === this.state.id) {
			if (name === "name") {
				return (
					<FieldTextStateless
						value={this.props.daten.newFriend.name || this.getOriginName()}
						onChange={this.updateNewFriend}
					/>
				)
			} else if (name === "telefon") {
				return (
					<FieldTextStateless
						value={this.props.daten.newFriend.telefon || this.getOriginName()}
						onChange={this.updateNewNumber}
					/>
				)
			}
		} else {
			return (
				<div>{text}</div>
			)
		}
	}

	renderIcons(id: number): JSX.Element {
		if (!this.props.daten.isEdit) {
			return (
				<Pencil label='penil icon' />
			)
		} else {
			if (this.state.id === id) {
				return (
					<Tick label='penil icon' />
				)
			} else {
				return (
					<Pencil label='penil icon' />
				)
			}
		}
	}

	renderEditClose(id: number): JSX.Element {
		if (this.props.daten.isEdit && this.state.id === id) {
			return (
				<Button
					iconBefore={<Cross label='cross icon' />}
					onClick={() => { this.setStateClose() }}
				/>
			)
		}
	}

	render(): JSX.Element {
		return (
			<div>
				<h3>Friends </h3>
				<TableTree
					columnWidths={['200px', '200px', '200px']}
				>
					<Headers>
						<Header>Name</Header>
						<Header>Telefonnummer</Header>
						<Header></Header>
					</Headers>
					{this.props.isTelefonlistLoaded ?
						<Rows
							items={this.props.names}
							render={({ id, name, telefon }) => (

								<Row itemId={id}>
									<Cell singleLine>{this.renderEdit("name", name, id)}</Cell>
									<Cell singleLine>{this.renderEdit("telefon", telefon, id)}</Cell>
									<Cell>
										<Button
											appearance='primary'
											onClick={() => { this.updateEintrag(id) }}
											iconBefore={this.renderIcons(id)}
										/>
										{this.renderEditClose(id)}
										<Button
											appearance='danger'
											onClick={() => { this.deleteEintrag(id) }}
											isDisabled={this.props.daten.isEdit}
											iconBefore={<TrashIcon label='trash icon' />}
										/>
									</Cell>
								</Row>
							)}
						/>
						: <Spinner size="xlarge" />
					}
				</TableTree>
			</div>
		)
	}
}