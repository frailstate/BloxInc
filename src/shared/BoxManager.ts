import { ReplicatedStorage, Workspace } from "@rbxts/services"

export class Box {

	box: CardboardBox
	owner: Player | undefined

	constructor(public xp: number = 100) {
		this.box = ReplicatedStorage.FindFirstChild('CardboardBox')?.Clone() as CardboardBox
	}

	/**
	 * Renders the box; adds information and parents to `Workspace`
	 * @param owner The player that will own this box
	 * 
	 */
	render(owner: Player) {
		let existingBox = Workspace.Boxes.FindFirstChild(owner.Name)
		if (existingBox) existingBox.Destroy() // just use existing?

		this.owner = owner

		this.box.Name = this.owner.Name
		this.box.Parent = Workspace.Boxes

		this.box.SetNetworkOwner(this.owner)

		this.update()
	}

	/**
	 * Increment current XP
	 * @param xp XP to increment current by
	 * @returns new XP
	 */
	addXP(xp: number) {
		this.xp += xp
		this.update()

		return this.xp
	}

	/**
	 * Apply all visual updates to the block
	 */
	update() {
		this.box.Info.Holder.CurXP.Text = '// XP: %d \\\\'.format(this.xp)
		this.box.Info.Holder.Owner.Text = this.owner!.Name
	}

}