import * as rp from 'request-promise';
import { get } from 'request-promise';
import { TelefonItem } from '../model/TelefonItem';


export class TelefonService {
	async loadTelefonliste(): Promise<TelefonItem[]> {
		let respo = await get("http://localhost:4001/allnumbers");
		let telefonlist = JSON.parse(respo);
		let newList = telefonlist.map((telefonitem) => {
			return {
				id: telefonitem.id,
				name: telefonitem.name,
				telefon: telefonitem.telefon
			};
		});
		return newList;
	}

	async addTelefonItem(newFriend: TelefonItem): Promise<void> {
		let options = {
			method: 'POST',
			uri: 'http://localhost:4001/addnumber',
			body: {
				name: newFriend.name,
				telefon: newFriend.telefon
			},
			json: true
		};

		await rp(options);
	}

	async updateTelefonItem(origin: number, next: TelefonItem): Promise<void> {
		let options = {
			method: 'PUT',
			uri: 'http://localhost:4001/updatenumber',
			body: {
				origin: {
					id: origin
				},
				next: {
					name: next.name,
					telefon: next.telefon
				}
			},
			json: true
		};

		await rp(options);
	}

	async deleteTelefonItem(deleteId: number): Promise<void> {
		let options = {
			method: 'DELETE',
			uri: 'http://localhost:4001/removenumber',
			body: {
				id: deleteId
			},
			json: true
		};

		await rp(options);
	}

}