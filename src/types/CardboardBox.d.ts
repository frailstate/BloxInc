interface CardboardBox extends MeshPart {
	Info: BillboardGui & {
		Holder: Frame & {
			Owner: TextLabel
			CurXP: TextLabel
		}
	}
}