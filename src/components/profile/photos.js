export default function Photos({photos}) {
   
    return (
        <div className="border-t border-gray-primary pt-4">
            <div className="grid grid-cols-3 gap-2 mt-4 mb-12">

                {photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                        <div className="flex-1 text-center ">
                            <img
                                className="w-full"
                                src={photo.data().postImg}
                            />
                        </div>


                    </div>
                ))}

            </div>


        </div>
    )
}